import type { AuthState as KindeAuthState } from "@nuxtjs/kinde"

declare module "@kinde-oss/kinde-typescript-sdk" {
  interface AuthState extends Omit<KindeAuthState, "user"> {
    user: {
      picture: string | undefined
      name: string
      family_name: string
      given_name: string
      email: string
      id: string
    }
  }
}
