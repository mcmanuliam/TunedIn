# ECHO

## What is Echo?
Echo is a unique platform that redefines how you document and share your travel experiences. It offers a thoughtful and reflective approach, allowing you to say, "I've been there too," while leaving your mark on the world.

#### Core Concepts
Echo emphasizes intention over instant gratification. Instead of immediate posting, Echo introduces a 24-hour delay before your location-based posts—Echos—are shared. This delay not only adds anticipation but also enhances security and encourages users to carefully choose and reflect on their moments.

### Key Features
**Post an Echo**: Capture the essence of your current location, from breathtaking views to hidden gems, and link a song to enhance the moment.

**Delayed Sharing**: After posting, your Echo becomes visible 24 hours later, embodying the idea of an "echo" and ensuring thoughtful sharing.

**Echo Feed**: Explore Echos from around the world or filter by your followers and locations, each accompanied by the story and music behind the moment.

**Echo Map**: An interactive map where you can discover where Echos are being posted globally, creating a visual journey of shared experiences.

#### Why Echo?
Echo is for travelers and adventurers who seek to go beyond mere snapshots. It's about capturing the true essence of your journeys, reflecting on them, and connecting with others in a meaningful way.

## What's in the Stack?
With Echo, the stack is designed with an emphasis on cross-platform compatibility, maintainability, and adaptability. This will allows us to deliver a seamless and consistent user experience across different devices while keeping our codebase clean and efficient. Below are the key technologies we will use:

- [**Ionic**](https://ionicframework.com/): We use Ionic for building a robust cross-platform application. Ionic leverages popular web frameworks like Angular, Vue, or React, enabling us to develop a single codebase that runs smoothly on both iOS and Android platforms.

- [**Angular**](https://angular.dev/): Angular is our chosen front-end framework, which excels in managing complex routing, reusing code components, and handling services efficiently. It provides a structured approach to building scalable and maintainable applications.

- [**Capacitor**](https://capacitorjs.com/): Capacitor is a key tool in our stack that bridges the gap between web and native app development. It allows us to compile our web-based code into native applications for iOS and Android effortlessly. The process is essentially as simple as running:

    - `ionic cap build ios`
    - `ionic cap build android`

- **Config Based Dev**: Our approach to development should be highly configurable, allowing us to toggle features on or off as needed. This makes it easy to tailor the app to our needs and rapidly deploy updates or new features. Here's an [intro](https://medium.com/captech-corner/an-intro-to-configuration-driven-development-cdd-48a1c088baa9) which'll cover the basics.

- **Translations**: By detaching translations from our templates, we can easily manage and update language support across the app. This ensures a smooth process for introducing new languages or adjusting text without complicating the codebase.

- [**Pug**](https://pugjs.org/api/getting-started.html): We use Pug as our templating language for its ability to integrate JavaScript directly into templates. Pug’s mixins feature is particularly powerful, enabling us to reduce redundant code and maintain cleaner, more efficient templates.

Our tech stack is carefully chosen to ensure Echo remains a dynamic, user-friendly platform that evolves with the needs of our global community.

## Creating a Commit
A code base is only as good as it's organisation as soon as you start losing track of aditions everything falls apart, the way we are attempting to tackle this is through a strict naming convention, the general convention is:

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

## How to get Started?
...