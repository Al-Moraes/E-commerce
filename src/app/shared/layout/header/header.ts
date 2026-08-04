import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatToolbarModule, RouterLink, MatIconModule, UpperCasePipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
    nomeLoja = 'Lojas Estadunidenses'; 
}
