import { AfterViewInit, Component, OnInit, computed, inject, signal } from '@angular/core';
import { UserService } from '../../service/user-service.service';
import { UserInfoInterface } from '../../interface';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit, AfterViewInit {
  
  private userService      = inject(UserService);
  public  userId           = signal(1);
  public  currentUser      = signal<UserInfoInterface | undefined>(undefined);
  public  userWasFound     = signal(false);
  public  isPrevDisabled   = signal(true);
  public  isNextDisabled   = signal(false);
  public  fullName         = computed(() => `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`);
  
  ngOnInit(): void {
    this.getCurrentUserInformation(this.userId());
  }
  
  ngAfterViewInit(): void {
    this.isPrevDisabled.set(true);
  }

  public getCurrentUserInformation(id : number) : void {
    this.userId.set(id);
    this.disablingButtons(false, false);

    if (this.userId() === 1) {
      this.disablingButtons(true, false);
    }

    if (this.userId() === 12) {
      this.disablingButtons(false, true);
    }

    this.userService.getSingleUser(id).subscribe({
      next: (user) => {
        this.currentUser.set(user);
        this.userWasFound.set(true);
      },
      error: () => {
        this.currentUser.set(undefined);
        this.userWasFound.set(false);
      }
    });
  }

  private disablingButtons(prev : boolean, next : boolean) {
    this.isPrevDisabled.set(prev);
    this.isNextDisabled.set(next);
  }
}
