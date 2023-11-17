import { Component, signal } from '@angular/core';
import { MenuItemInterface } from '../../interface';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  public menuItems  = signal<MenuItemInterface[]>([
    { title: 'Counter', route: 'counter' },
    { title: 'User', route: 'user-info' },
    { title: 'Mutations', route: 'properties' },
  ]);

  /* public menuItems : MenuItemInterface[] = [
    { title: 'Counter', route: 'counter' },
    { title: 'User', route: 'user-info' },
    { title: 'Mutations', route: 'properties' },
  ]; */
}
