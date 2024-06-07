import { Component } from '@angular/core';
import { CardViewService } from '../../services/components/card-view.service';
import { CardView } from '../../interface/components/card-view';
import { retry } from 'rxjs';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-main-primary',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './main-primary.component.html',
  styleUrl: './main-primary.component.css'
})
export class MainPrimaryComponent {


  private cardsView : CardView[] = []
  constructor(cardViewService : CardViewService,)
  {
    this.cardsView = cardViewService.CardsView
    console.log(this.cardsView)
  }


  get CardsView()
  {
    return this.cardsView
  }
}
