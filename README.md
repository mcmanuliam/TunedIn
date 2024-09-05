# ECHO

## What is Echo?
Echo is a unique platform that redefines how you document and share your travel experiences. It offers a different approach to social media akin to messages from dark souls, allowing you to say, "I've been there too" while leaving your mark on the world.

#### Core Concepts
Echo emphasizes the idea of leaving your mark. Instead of immediate gratiture, echo leans more towards the idea of placing your flag pole and leaving it behind for others to see.

## What's in the Stack?
With Echo, the stack is designed with an emphasis on cross-platform compatibility, maintainability, and adaptability. This will allows us to deliver a seamless and consistent user experience across different devices while keeping our codebase clean and efficient. Below are the key technologies we will use:

- [**Ionic**](https://ionicframework.com/): We use Ionic for building a robust cross-platform application. Ionic leverages popular web frameworks like Angular, Vue, or React, enabling us to develop a single codebase that runs smoothly on both iOS and Android platforms.

- [**Angular**](https://angular.dev/): Angular is our chosen front-end framework, which excels in managing complex routing, reusing code components, and handling services efficiently. It provides a structured approach to building scalable and maintainable applications.

- [**Capacitor**](https://capacitorjs.com/): Capacitor is a key tool in our stack that bridges the gap between web and native app development. It allows us to compile our web-based code into native applications for iOS and Android effortlessly. The process is essentially as simple as running:

    - `ionic cap build ios`
    - `ionic cap build android`

- [**Pug**](https://pugjs.org/api/getting-started.html): We use Pug as our templating language for its ability to integrate JavaScript directly into templates. Pug’s mixins feature is particularly powerful, enabling us to reduce redundant code and maintain cleaner, more efficient templates.

- [**Supabase**](https://github.com/supabase/supabase): We use Supabase as our codeless backend, this opensource alternative allows us to easily run locally and host live data.

Our tech stack is carefully chosen to ensure Echo remains a dynamic, user-friendly platform that evolves with the needs of our global community.

## How to get Started?
Just a heads up - these instructions are all written by a mac user, these may differ platform to platform. As a general pre-requisite it's best to read up on the [Ionic Getting Started Guide](https://ionicframework.com/docs/developing/starting) to introduce yourself to a lot of the concepts I mention here, once you've done that getting started should be as simple as cloning the repo and installing all deps:
```
npm ci --legacy-peer-deps
```

### Getting Started with Supabase
To set up the backend for `Echo` using Supabase, follow these steps. Adjustments may be needed for other platforms.

- Install Supabase CLI: Ensure you have Node.js installed. Then, you can install the Supabase CLI globally via npm or brew: `brew install supabase/tap/supabase`.
- Log in to Supabase: Authenticate your CLI with your Supabase account: `supabase login`.
- Initialize a New Supabase Project: Create a new directory for your project, navigate to it, and run: `supabase init`.
- Start the Supabase Local Development Environment: To begin using Supabase locally, run: `supabase start`

### To run through Web Browser
Run through `ionic serve` which should load up a web browser window and give you the ability to live reload.

### iOS and Android
We use Capacitor to allow for cross-platform code, if you've used cordova this is quite similar, [Read about the differences here](https://ionic.io/resources/articles/capacitor-vs-cordova-modern-hybrid-app-development).

- Stop any instances of `ionic serve`
- Run `ionic build` to generate the www directory used for native.
- Run `ionic cap copy` to copy native changes to Angular.
- Run `ionic cap sync` to copy over dependencies from Angular to native.
- Now if you've setup Android and iOS to be able to run from cmd you will be able to run:
  - `ionic cap run ios` to run the ios app (must be running mac with xcode installed)
  - `ionic cap run android` to run the android (must have android studio installed)
- If not then please follow the native guide for specific platforms [iOS](ios) or [Android](android)

### iOS
***Perform the steps mentioned above in [iOS and Android](ios-and-android) before attempting these steps***

- Open the directory in xcode, this can be done through `ionic cap open ios`
- Select an emulator from the dropdown in the top (I always go for the most recent but when it comes to test purposes it's best to go through a few different diverse options)
- Click the `run` icon and an emulator should open up
- You will notice a log will also attach to your emulator in xcode, this is the main way to debug iOS apps on older versions of mac os.

To run the app on a local device you must be a part of the whitelisted devices setup in xcode, if you aren't setup feel free to change this over to your local team (don't push this change), if you wish to get this setup please message Liam for permission.

- Enable dev mode on the device
- Plugin the device to your mac
- Make sure your device has the correct apple id setup
  - On xcode navigate to `Signing and Capabilites`
  - For your teamselect the team from the Apple id registered on your local device.
  - On running select your device name and click run.

Once you have run the app once through xcode it should be open to run through `ionic cap run ios` so feel free to only refer to [iOS and Android](ios-and-android) once this is complete.

### Android
***Perform the steps mentioned above in [iOS and Android](ios-and-android) before attempting these steps***

- To start you will need to have a version of android studio downloaded - [Android Studio](https://developer.android.com/studio?gad_source=1&gclid=Cj0KCQjwrKu2BhDkARIsAD7GBotK3xKCEYVuBPv5du3RbeW8YkFV9HKniZHXrY8TfGXaygf76vfWIjsaAuicEALw_wcB&gclsrc=aw.ds)
- Open the project in Android studio `ionic cap open android`
- Download the required deps, they will appear on open of Android Studio
- Open the device managment panel, should be by default on the right side of the screen
- Select a device
-   If no devices are listed you will need to download one
- Once you have selected a device, run it
- Run the app and you should see it load up on the emulator.
  
## Creating a Commit
Want to contribute? There's a few rules, a code base is only as good as it's organisation as soon, as you start losing track of aditions everything falls apart, the way we are attempting to tackle this is through a strict naming convention, the general convention is:

```bash
COMMIT_TYPE[PLATFORM](LOCATION): COMMIT_MSG #COMMIT_NUMBER
```

**COMMIT_TYPE** is the type of commit, which can be one of:
  - **feat** - Used adding features
  - **fix** - Used for fixing older code
  - **refactor** - Used for refactoring old code without any user facing changes.
  - **docs** - Used for writing documentation and adding comments into code (we will be following a lot of the standard [**JSDoc**](https://jsdoc.app/conventions)) this can be bundled into the squashed feature commit.
  - **i18** - Used for commits only altering translations, if these are a part of a larger feature.

**PLATFORM** is for platform specific commits, which can be one of:
  - **md** - Used for commits only effecting Android devices.
  - **ios** - Used for commits only effecting iOS devices.

**LOCATIONS** is for location specifc commits, this will be one of a prefined list, I'll update this acordingly.

**COMMIT_MSG** will be your standard commit message.

**COMMIT_NUMBER** this will be the issue number, **ALL COMMITS MUST ORIGINATE FROM AN ISSUE**, if no issue is raised - raise one.

A big concept with our Version Control strategy is to be clean and concise, a way for us to easily maintain this is through [**Squashing**](https://medium.com/@flaviocopes/git-squashing-vs-not-squashing-af5009f47d9e#:~:text=Let's%20talk%20about%20squashing.,even%20squash%20commits%20at%20all%E2%80%9D%3F) commits, rather than having a feature with: `do something`, `fix something`, `fix the new fix` being merged into the codebase we will just merge `do something`.
