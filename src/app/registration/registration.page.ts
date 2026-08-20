import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';


import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class RegistrationPage implements AfterViewInit {

  @ViewChild('particleCanvas')
  particleCanvas!: ElementRef<HTMLCanvasElement>;

  showPassword = false;

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];

  ngAfterViewInit(): void {
    this.initializeParticles();
  }


  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }


  signUp(): void {
    console.log('Sign Up clicked');
  }


  private initializeParticles(): void {

    const canvas = this.particleCanvas.nativeElement;

    this.ctx = canvas.getContext('2d')!;

    this.resizeCanvas();

    window.addEventListener(
      'resize',
      () => this.resizeCanvas()
    );

    for (let i = 0; i < 40; i++) {
      this.particles.push(
        new Particle(canvas)
      );
    }

    this.animate();
  }


  private resizeCanvas(): void {

    const canvas = this.particleCanvas.nativeElement;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }


  private animate(): void {

    const canvas = this.particleCanvas.nativeElement;

    this.ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    this.particles.forEach((particle) => {

      particle.update();

      particle.draw(this.ctx);

    });

    requestAnimationFrame(
      () => this.animate()
    );
  }
}


class Particle {

  x: number;
  y: number;

  size: number;

  speedX: number;
  speedY: number;

  opacity: number;

  color = '#8455ef';

  private canvas: HTMLCanvasElement;


  constructor(canvas: HTMLCanvasElement) {

    this.canvas = canvas;

    this.x =
      Math.random() *
      canvas.width;

    this.y =
      Math.random() *
      canvas.height;

    this.size =
      Math.random() * 2 + 1;

    this.speedX =
      Math.random() * 0.5 - 0.25;

    this.speedY =
      Math.random() * 0.5 - 0.25;

    this.opacity =
      Math.random() * 0.5;
  }


  update(): void {

    this.x += this.speedX;

    this.y += this.speedY;


    if (this.x > this.canvas.width) {
      this.x = 0;
    }

    if (this.x < 0) {
      this.x = this.canvas.width;
    }

    if (this.y > this.canvas.height) {
      this.y = 0;
    }

    if (this.y < 0) {
      this.y = this.canvas.height;
    }
  }


  draw(ctx: CanvasRenderingContext2D): void {

    ctx.globalAlpha = this.opacity;

    ctx.fillStyle = this.color;

    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.size,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.globalAlpha = 1;
  }
}