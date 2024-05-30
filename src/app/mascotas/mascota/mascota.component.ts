import { Component } from '@angular/core';
import { MascotasService } from '../../services/mascotas.service';
import { Mascota } from '../../domain/mascota';

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.scss'
})
export class MascotaComponent {
  mascotas: any;
  mascota: Mascota = new Mascota();
  mascotaEliminar: Mascota = new Mascota();

  constructor(private mascotasService:MascotasService){}


  ngOnInit(): void {
    this.mascotas = this.mascotasService.getMascotas();
  }

  guardarMascota(){
    if (this.mascota.codigo_mascota) {
      this.mascotasService.updateMascota(this.mascota).subscribe(data => {
        this.ngOnInit();
        this.mascota = new Mascota();
      });
    } else {
      this.mascotasService.saveMascota(this.mascota).subscribe(data => {
        this.ngOnInit();
        this.mascota = new Mascota();
      });
    }
  }

  eliminarMascota(mascota: Mascota){
    this.mascotaEliminar=mascota;
    console.log(this.mascotaEliminar);
    if(this.mascotaEliminar.codigo_mascota!=undefined){
      const codigomascota: number = this.mascotaEliminar.codigo_mascota;
      this.mascotasService.deleteMascota(codigomascota).subscribe(data=>{
        this.ngOnInit();
      })
    }
  }

  cargarMascota(mascota: Mascota) {
    this.mascota = { ...mascota };
  }

}
