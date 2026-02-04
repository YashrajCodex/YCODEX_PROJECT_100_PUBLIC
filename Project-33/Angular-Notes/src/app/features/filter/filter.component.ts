import { Component } from '@angular/core';
import {  LucideAngularModule, FunnelIcon} from 'lucide-angular';

@Component({
  selector: 'app-filter',
  imports: [LucideAngularModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  readonly icons = { FunnelIcon };
}
