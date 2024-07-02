import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class ScriptLoaderService {
    private scripts: { [key: string]: { loaded: boolean } } = {}

    loadScript(name: string, src: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.scripts[name] && this.scripts[name].loaded) {
                resolve()
                return
            }

            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = src
            script.onload = () => {
                this.scripts[name] = { loaded: true }
                resolve()
            }
            script.onerror = (error: any) => reject(error)
            document.head.appendChild(script)
        })
    }
}
