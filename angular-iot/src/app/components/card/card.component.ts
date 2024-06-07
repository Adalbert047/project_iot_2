import { Component, Input } from '@angular/core';
import { CardView } from '../../interface/components/card-view';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  

  @Input() card! : CardView
}
