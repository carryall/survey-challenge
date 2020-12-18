import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  pageDescription = '';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.pageDescription = this.activatedRoute.firstChild?.snapshot.data.title;
  }
}
