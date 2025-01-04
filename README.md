# ExpoBase: A React Native Boilerplate with Expo, Supabase, and React Query 👋

Welcome to **ExpoBase**, a modern React Native boilerplate built with [Expo](https://expo.dev), [Supabase](https://supabase.io), and [React Query](https://tanstack.com/query/latest). Designed to kickstart your mobile app development with ease and scalability.

---

## Features

- **Expo**: Simplifies building cross-platform apps.
- **Supabase**: Backend as a service with authentication and database integration.
- **React Query**: Efficient data fetching and caching.

---

## Getting Started 🚀

### 1. Clone or Fork the Repository
```bash
git clone https://github.com/your-username/ExpoBase.git
cd ExpoBase
```

### 2. Set Up Google Console
To enable Google authentication, follow these steps:

1. **Create a Project** in the [Google Cloud Console](https://console.cloud.google.com/).
2. **Add OAuth 2.0 Client IDs**:
   - **Web Client**:
     - Set **Authorized Redirect URIs** to your Supabase callback URL.
     - Set **Authorized JavaScript Origins** to `https://localhost:8081`.
     - Retrieve the **Client Secret** and **Client ID** for `.env.local` and Supabase configuration.
   - **Android Client**:
     - Set the **Package Name** (found in `app.json` under `android.package`).
     - Add **SHA-1 Certificate Fingerprint** (see step below).

3. **Get SHA-1 Fingerprint**:
   Run the following command, adjusting the path as needed:
   ```bash
   keytool -keystore D:\dev\ExpoBase\android\app\debug.keystore -list -v
   ```

4. Update your `app.json` (if required):
   ```json
   "android": {
      "permissions": [
         "INTERNET"
      ],
      "package": "com.julian.ExpoBase"
   }
   ```

---

### 3. Install Dependencies
Ensure all required packages are installed:
```bash
npm install
```

---

### 4. Set Up Environment Variables
Create a `.env.local` file in the root directory and add your keys:
```dotenv
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
EXPO_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

---

### 5. Start the App
Run the development server with Expo:
```bash
npx expo start
```

---

## Folder Structure 📂
Here's an overview of the primary folders in this boilerplate:

```
/app
  /screens                # Dedicated folder for screens
    /root                 # Screens for the root layout
      /tabs               # Screens nested within tabs
        _layout.tsx       # Layout for the tab navigator
        index.tsx         # Home tab
        profile.tsx       # Profile tab
        search.tsx        # Search tab
      _layout.tsx         # Layout for the root navigator
      sign_in.tsx         # Sign-in screen
    globals.css           # Global CSS styles
    _layout.tsx           # Overall app layout

/assets                   # Static assets like images and fonts

/components               # Reusable components
  Auth.tsx                # Authentication-related UI components
  GoogleAuth.tsx          # Google authentication component

/hooks                    # Custom hooks
  useUser.tsx             # Hook for user-related data and actions

/lib                      # Libraries and configurations
  supabase.ts             # Supabase configuration and initialization

/utils                    # Utility functions and helpers
  authHelpers.ts          # Authentication helper functions

```

---

## Troubleshooting 🛠️
- **Signing in errors**: instead of `npx expo run start`, use `npx expo run:android`
- **Google Play Services Errors**: Ensure Google Play Services is updated on your Android device/emulator.
- **Environment Variables**: Double-check `.env.local` for correct keys.
- **Network Issues**: Verify your Supabase URL and internet connectivity.

---

## Contributions & Support 💡
Feel free to open issues or submit pull requests. For questions or feedback, reach out at [julianbuckham404@gmail.com](mailto:julianbuckham404@gmail.com).

---

## License 📄
This project is licensed under the MIT License.
