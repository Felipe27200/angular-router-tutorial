import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  sessionId!: Observable<string>;
  token!: Observable<string>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit()
  {
    /**
     * +----------------------------------------------+
     * | OBSERVABLES - QUERY PARAMETERS AND FRAGMENTS |
     * +----------------------------------------------+
     * 
     * Query parameters y Fragments también están disponibles a través
     * del servicio ActivatedRoute.
     * 
     * Como parárametros de ruta, estos son proveidos como Observables.
     */
    // Capture the session ID if available
    this.sessionId = this.route.queryParamMap
      .pipe(map(params => params.get('session_id') || 'None'));

    // Capture the fragment if available
    this.token = this.route.fragment
      .pipe(map(fragment => fragment || 'None'));
  }
}
