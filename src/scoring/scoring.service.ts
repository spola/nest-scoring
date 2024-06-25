import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from '../clients/entities/client.entity';
import { IsNull, LessThan, Or, Repository } from 'typeorm';
import { MessageEntity } from '../clients/entities/message.entity';
import { ClientToScoreView } from './entities/client-to-score-view.entity';
import { NotFoundError } from 'rxjs';
import { ClientScoringVectorDTO } from './dto/client-scoring-vector.dto';
// import { ClientToDoFollowUpView } from './entities/client-to-do-follow-up-view.entity';
import vectorFactor, { VectorFactor } from './scoring.factors';

@Injectable()
export class ScoringService {
  constructor(
    @InjectRepository(ClientToScoreView)
    private clientToScoreViewRepository: Repository<ClientToScoreView>,
  ) {}

  /**
   * Create client data used to calculate the scoring
   *
   * @remarks
   * - The interest of the client, more messages in the last month, more interest. 0 messages, 0 interes.
   * - Purchase capacity, the relation of savings and down payment.
   * - The mortage calculated, for simplicity, without interest rate.
   * - Amount of months the client must pay to eliminate the debts. 0 Salary, Infinity months.
   * - Debts minus the savings, that was the real savings.
   *
   * @param clientData set of data
   * @param cost purchase amount
   * @param downPaymentPercentaje down payment percenteje [0-100]
   * @returns data vector
   */
  createVector(
    clientData: ClientToScoreView,
    cost: number,
    downPaymentPercentaje: number,
  ): ClientScoringVectorDTO {
    //The interest of the client, more messages in the last month, more interest. 0 messages, 0 interes
    let interest =
      clientData.totalMessages == 0
        ? 0
        : clientData.lastMessages / clientData.totalMessages;

    let downPayment = (cost * downPaymentPercentaje) / 100;

    // Purchase capacity, the relation of savings and down payment.
    let purshaseCapacity = clientData.savings / downPayment;

    // Mortage calculated, for simplicity, without interest rate
    let mortage = (cost - clientData.savings) / (20 * 12);

    // Montly payment capacity relative to the salary
    let monthlyPercentegeSalary =
      clientData.salary == 0 ? Number.POSITIVE_INFINITY : mortage / clientData.salary;

    // Amount of months the client must pay to eliminate the debts. 0 Salary, Infinity months.
    let monthOfDebts =
      clientData.salary == 0
        ? Number.POSITIVE_INFINITY
        : clientData.totalDebts / clientData.salary;

    // Debts minus the savings, that was the real savings
    let realSavings =
      (clientData.savings - clientData.totalDebts) / downPayment;

    return {
      interest,
      purshaseCapacity,
      monthlyPercentegeSalary,
      monthOfDebts,
      realSavings,
    };
  }

  createFactors(
    clientData: ClientToScoreView,
    cost: number,
    downPaymentPercentaje: number,
  ): VectorFactor {
    return vectorFactor;
  }

  convertCost(cost: number): number {
    return cost * 38000;
  }

  async calculate(
    id: number,
    cost = 3000,
    downPaymentPercentaje = 20,
  ): Promise<{ scoring: number }> {
    let dto = await this.clientToScoreViewRepository.findOne({
      where: { id: id },
    });
    if (dto == null) {
      throw new NotFoundException(`Client "${id}" not found`);
    }

    let costNormalized = this.convertCost(cost);

    let vector = this.createVector(dto, costNormalized, downPaymentPercentaje);
    let factors = this.createFactors(
      dto,
      costNormalized,
      downPaymentPercentaje,
    );

    let scoring =
      factors.interest(vector.interest) +
      factors.purshaseCapacity(vector.purshaseCapacity) +
      factors.monthlyPercentegeSalary(vector.monthlyPercentegeSalary) +
      factors.monthOfDebts(vector.monthOfDebts) +
      factors.realSavings(vector.realSavings);

    return {
      scoring,
    };
  }
}
