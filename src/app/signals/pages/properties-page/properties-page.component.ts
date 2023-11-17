import { Component, OnInit, effect, signal } from '@angular/core';
import { UserInfoInterface } from '../../interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent implements OnInit {
  
  public counter           = signal(1);
  public user              = signal<UserInfoInterface>({
    id: 1,
    email: "george.bluth@reqres.in",
    first_name: "George",
    last_name: "Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg"
  });
  public userChangedEffect = effect(() => {
    console.log(`userChangedEffect: ${this.user().first_name} - ${this.counter()}`);
  });
  
  ngOnInit(): void {
    // check the browser console, the set interval won't stop working the message "set interval still working..." will always be printed.
    // on the other hand the message from the userChangedEffect will dissapear once you go to other page. in other words it'll destroy automatically.
    // NOTE: Destroy option is available for the userChangedEffect by writing --> userChangedEffect.destroy();
    setInterval(() => {
      this.counter.update(current => current + 1);
      console.log('set interval still working...');
    }, 1000);
  }

  public increaseCounter(value : number) {
    this.counter.update(current => current + value);
  }

  public onFieldUpdated(field : keyof UserInfoInterface, value : string) {
    this.user.update((current) => {
      switch (field) {
        case 'first_name':
          current.first_name = value;
          break;
          
        case 'last_name':
          current.last_name = value;
          break;
          
        case 'email':
          current.email = value;
          break;
          
        case 'avatar':
          current.avatar = value;
          break;
        
        default:
          return current;
      }

      return current;
    });
  }
}
