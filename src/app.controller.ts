import {
  ApiBody,
  ApiDefaultResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@ApiTags('web')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @ApiOperation({
    summary: 'Representa el home page del sitio de la api.',
  })
  @ApiResponse({
    status: 200,
    description: 'La página',
  })
  @Get()
  getHello(@Res() res: Response) {
    res.send(`
     <html class="js sizes customelements history pointerevents postmessage webgl websockets cssanimations csscolumns csscolumns-width csscolumns-span csscolumns-fill csscolumns-gap csscolumns-rule csscolumns-rulecolor csscolumns-rulestyle csscolumns-rulewidth csscolumns-breakbefore csscolumns-breakafter csscolumns-breakinside flexbox picture srcset webworkers sizes customelements history pointerevents postmessage webgl websockets cssanimations csscolumns csscolumns-width csscolumns-span csscolumns-fill csscolumns-gap csscolumns-rule csscolumns-rulecolor csscolumns-rulestyle csscolumns-rulewidth csscolumns-breakbefore csscolumns-breakafter csscolumns-breakinside flexbox picture srcset webworkers" lang="en"><head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">


  <title>Lidz | Digitaliza tu inmobliaria</title>
  <meta name="description" content="Moderniza tu fuerza de ventas inmobiliaria, mejora tu conversión, chat 24/7 con inteligencia artificial">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="author" content="Lidz">
  <link rel="shortcut icon" href="assets/logo.webp" type="image/png">
  <link rel="stylesheet" href="https://lidz.cl/assets/magnific-popup.css">
  <link rel="stylesheet" href="https://lidz.cl/assets/animate.css">
  <link rel="stylesheet" href="https://lidz.cl/assets/slick.css">
  <link rel="stylesheet" href="https://lidz.cl/assets/swiper.min.css">
  <link rel="stylesheet" href="https://lidz.cl/assets/lineicons.css">
  <link rel="stylesheet" href="https://lidz.cl/assets/bootstrap.min.css">
  <link rel="stylesheet" href="https://lidz.cl/assets/default.css">
  <link rel="stylesheet" href="https://lidz.cl/assets/style.css">
  <style type="text/css">
    .display-none {
      display: none !important;
    }

    .display-yes {
      display: block !important;
    }
  </style>
<style type="text/css">
    .lidzWhatsAppButton {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 0;
      cursor: pointer;
      transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-radius: 50%;
      z-index: 1050;
      box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
      background-color: #25d366;
      position: fixed;
      bottom: 20px;
      right: 20px;
      height: 58px;
      width: 58px;
    }

    .lidzWhatsAppButton:hover {
      background-color: #65df92;
    }

    .lidzWhatsAppButton svg {
      width: 1em;
      height: 1em;
      fill: white;
      font-size: 40px;
    }
  </style></head>

<body>
  <!--[if IE]>
    <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
  <![endif]-->

  <div class="preloader" style="display: none;">
    <div class="loader">
      <div class="ytp-spinner">
        <div class="ytp-spinner-container">
          <div class="ytp-spinner-rotator">
            <div class="ytp-spinner-left">
              <div class="ytp-spinner-circle"></div>
            </div>
            <div class="ytp-spinner-right">
              <div class="ytp-spinner-circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <header class="header-area">
    <div class="navbar-area">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <nav class="navbar navbar-expand-lg">
              <a class="navbar-brand" href="/">
                <img src="https://lidz.cl/assets/logo-long.webp" alt="Logo">
              </a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="toggler-icon"></span>
                <span class="toggler-icon"></span>
                <span class="toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                <ul id="nav" class="navbar-nav ml-auto">
                  <li class="nav-item active">
                    <a class="page-scroll" target="blanck" href="https://lidz.cl/#home">Inicio</a>
                  </li>
                  <li class="nav-item">
                    <a class="page-scroll" target="blanck" href="https://lidz.cl/#why">Beneficios</a>
                  </li>
                  <!-- <li class="nav-item">
                    <a class="page-scroll" target="blanck" href="https://lidz.cl/#features">Features</a>
                  </li>
                  <li class="nav-item">
                    <a class="page-scroll" target="blanck" href="https://lidz.cl/#screenshots">Screenshots</a>
                  </li> -->
                  <li class="nav-item display-none">
                    <a class="page-scroll" target="blanck" href="https://lidz.cl/#pricing">Precios</a>
                  </li>
                  <li class="nav-item">
                    <a class="page-scroll" target="blanck" href="https://lidz.cl/#contact">Contacto</a>
                  </li>
                  <li class="nav-item">
                    <a target="blanck" href="https://app.lidz.ai">Entrar</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div id="home" class="header-hero bg_cover d-lg-flex align-items-center">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
      <div class="shape shape-5"></div>
      <div class="shape shape-6"></div>
      <div class="container">
        <div class="row align-items-center justify-content-center justify-content-lg-between">
          <div class="col-lg-6 col-md-10">
            <div class="header-hero-content">
              <h3 class="header-title wow fadeInLeftBig" data-wow-duration="1s" data-wow-delay="0.2s" style="visibility: visible; animation-duration: 1s; animation-delay: 0.2s; animation-name: fadeInLeftBig;">
                <span></span>Convierte tus ventas inmobiliarias con inteligencia artificial
              </h3>
              <p class="text wow fadeInLeftBig" data-wow-duration="1s" data-wow-delay="0.6s" style="visibility: visible; animation-duration: 1s; animation-delay: 0.6s; animation-name: fadeInLeftBig;">
                Optimiza y califica prospectos automáticamente, enfocando esfuerzos donde realmente importa y
                revolucionando tu proceso de ventas digital.
              </p>
              <p class="text wow fadeInLeftBig" data-wow-duration="1s" data-wow-delay="0.6s" style="visibility: visible; animation-duration: 1s; animation-delay: 0.6s; animation-name: fadeInLeftBig;">
                Explora la API que tenemos disponible para que puedas interconectarte con nuestro sistema.
              </p>
              <ul class="d-flex">
                <li><a href="/api" class="page-scroll main-btn wow fadeInLeftBig" data-wow-duration="1s" data-wow-delay="0.8s" style="visibility: visible; animation-duration: 1s; animation-delay: 0.8s; animation-name: fadeInLeftBig;">API Swagger</a>
                </li>
              </ul>
              <p>También puedes descargar el json en estándar 
                <a href="/api-json" target="blanck">open api 3.0 desde acá </a>
              </p>
            </div>
          </div>
          <div class="col-md-6 col-10">
            <div class="header-image">
              <img src="https://lidz.cl/assets/Lidz-homeimage.png" alt="app" class="image wow fadeInRightBig" data-wow-duration="1s" data-wow-delay="0.5s" style="visibility: visible; animation-duration: 1s; animation-delay: 0.5s; animation-name: fadeInRightBig;">
              <div class="image-shape wow fadeInRightBig display-none animated" data-wow-duration="1s" data-wow-delay="0.8s" style="visibility: visible; animation-duration: 1s; animation-delay: 0.8s; animation-name: fadeInRightBig;">
                <img src="https://lidz.cl/assets/image-shape.svg" alt="shape">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="header-shape-1 d-none d-md-block"></div>
      <div class="header-shape-2">
        <img src="https://lidz.cl/assets/header-shape-2.svg" alt="shape">
      </div>
    </div>
  </header>


  


  


  


  


  


  


  

  


  





  
  

  
  

  

  

  

  

  
  

  
  
  


</body></html> 
      
      `);
  }
}
