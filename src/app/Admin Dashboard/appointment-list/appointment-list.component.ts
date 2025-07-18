import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/model/appointment';
import { AppointmentService } from 'src/app/service/appointment.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
appointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) {}
tests: any[] = [];

  ngOnInit(): void {
    this.loadAppointments();


    const data = localStorage.getItem('app');
    if (data) {
      const prescription = JSON.parse(data);
      this.tests = prescription.tests || [];
    }
  }

  loadAppointments() {
    this.appointmentService.getAppointments().subscribe(res => this.appointments = res);
  }

  approve(appointment: Appointment) {
    appointment.status = 1; // Approved
    this.appointmentService.update(appointment).subscribe(() => {
      this.loadAppointments();
    });
  }

  cancel(appointment: Appointment) {
    if (!appointment.id) return;
    this.appointmentService.delete(appointment.id).subscribe(() => {
      this.appointments = this.appointments.filter(a => a.id !== appointment.id);
    });
  }
}
