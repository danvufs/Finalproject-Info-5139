
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthProvider, User } from 'firebase/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/auth';
import { AppUser } from '../models/app-user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root'
})


export class AuthService { 
  userData: any;
  user$: Observable<firebase.User>;

  constructor(public afs: AngularFirestore, 
              public afAuth: AngularFireAuth, 
              public router: Router,
              public ngZone: NgZone) {
    
    this.user$=afAuth.authState;
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        // this.SendVerificationMail();
        this.SetUserData(result.user);
        alert('You have signed up successfully!');
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['products']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: AppUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      // name: user.email,
      // photoURL: user.photoURL,
      
    };
    return userRef.set(userData, {
      merge: true,
    });
  }


  
  login() {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider).then(
      res => {
        this.router.navigate(['/products']);
        localStorage.setItem('token', JSON.stringify(res.user));
      }, err => {
        alert(err.message);
      })
  }

   logout() {
    this.afAuth.signOut();
  }
}