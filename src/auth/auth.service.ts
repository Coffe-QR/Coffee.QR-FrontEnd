import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { User } from './model/user.model'
import { TokenStorage } from './jwt/token.service'
import { AuthResponse } from './model/auth-response.model'
import { Login } from './model/login.model'
import { Registration } from './model/registration.model'
import { environment } from '../env/environment'
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user$ = new BehaviorSubject<User>({ username: '', id: 0, role: '' })

    constructor(
        private http: HttpClient,
        private tokenStorage: TokenStorage,
        private router: Router
    ) {}

    // Path: src/auth/auth.service.ts

    login(login: Login): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(environment.apiHost + 'users/login', login)
            .pipe(
                tap((authenticationResponse) => {
                    this.tokenStorage.saveAccessToken(
                        authenticationResponse.accessToken
                    )
                    this.setUser()
                })
            )
    }

    register(registration: Registration): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(
                environment.apiHost + 'users/register',
                registration
            )
            .pipe(
                tap((authenticationResponse) => {
                    this.tokenStorage.saveAccessToken(
                        authenticationResponse.accessToken
                    )
                    this.setUser()
                })
            )
    }

    logout(): void {
        this.router.navigate(['/home']).then((_) => {
            this.tokenStorage.clear()
            this.user$.next({ username: '', id: 0, role: '' })
        })
    }

    checkIfUserExists(): void {
        const accessToken = this.tokenStorage.getAccessToken()
        if (accessToken == null) {
            return
        }
        this.setUser()
    }

    private setUser(): void {
        const jwtHelperService = new JwtHelperService()
        const accessToken = this.tokenStorage.getAccessToken() || ''
        const user: User = {
            id: +jwtHelperService.decodeToken(accessToken).id,
            username: jwtHelperService.decodeToken(accessToken).username,
            role: jwtHelperService.decodeToken(accessToken)[
                'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ],
        }
        this.user$.next(user)
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(
            'https://localhost:44333/api/users//GetById/' + id
        )
    }
}
