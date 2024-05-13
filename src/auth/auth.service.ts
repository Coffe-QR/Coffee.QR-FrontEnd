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
import { Buffer } from 'buffer'

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
            localStorage.removeItem('jwt')
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
            role: jwtHelperService.decodeToken(accessToken).role,
        }
        this.user$.next(user)
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(
            'https://localhost:44333/api/users//GetById/' + id
        )
    }

    public decodeToken(token: string): any {
        const parts = token.split('.')
        if (parts.length !== 3) {
            throw new Error('JWT must have 3 parts')
        }

        const decodedPayload = this.decodePayload(parts[1])
        return JSON.parse(decodedPayload)
    }

    private decodePayload(payload: string): string {
        // Replace Base64Url characters to Base64
        const base64String = payload.replace(/-/g, '+').replace(/_/g, '/')
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4) // Add removed '=' padding
        const base64 = base64String + padding

        return Buffer.from(base64, 'base64').toString('utf-8')
    }
}
