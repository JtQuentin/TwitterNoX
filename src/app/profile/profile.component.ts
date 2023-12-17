import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: any;

  constructor(private authService: AuthService, private profileService: ProfileService) {}

  ngOnInit() {
    const userId = this.authService.user?.id;

    if (userId) {
      this.profileService.getProfileByUserId(userId).subscribe((profile) => {
        this.profile = profile[0];
      });
    }
  }

  loadProfile() {
    const userId = this.authService.user?.id;

    if (userId) {
      this.profileService.getProfileByUserId(userId).subscribe(
        (data) => {
          this.profile = data[0];
        },
        (error) => {
          console.error('Erreur lors du chargement du profil', error);
        }
      );
    } else {
      console.error("L'utilisateur n'est pas connecté.");
    }
  }

  updateProfile() {
    this.profileService.updateProfile(this.profile.id, {
      bio: this.profile.bio,
      birthDay: this.profile.birthDay,
      birthMonth: this.profile.birthMonth
    }).subscribe(
      (response) => {
        console.log('Profil mis à jour avec succès', response);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du profil', error);
      }
    );
  }
}
