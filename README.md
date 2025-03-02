# WaveRD ✨

**WaveRD**: is a free online Soccer Manager for advanced soccer management. The title of manager is almost exclusively used in British football. In most other European countries in which professional football is played, the person responsible for the direction of a team is awarded the position of coach or "trainer"<br/>
This app was built to meet a true soccer management system where the developers and contributors also play the game.<br/>
I've always had the goal to build a free online soccer app that can compete with **FIFA** and **eFootball**, but then what really pushed/motivated me to start the development of WaveRD, was a question asked on another Soccer Manager platform, and the user goes like this '**Does the developers of this game even play it or knows what it looks like?**'<br/>
Initially, **WaveRD** was a closed source app, but my mentor who's a lover of Open Source Community influenced my decision to make it public; such that it will really benefit the software developers community, in a way that new developers and experienced developers can fork the project, tweak it and experiment new features with it.<br/>
That being said **PERMISSION IN NOT GRANTED TO CLONE THIS APP FOR ANY COMMERCIAL GAIN IN ANY FORM NOR DEVIATE FROM IT'S ORIGINAL PURPOSE, NEITHER IS ANYONE ALLOWED TO USE PART/FULL CODEBASE ON ANOTHER PLATFORM WITHOUT EXPLICIT AUTHORIZATION FROM ME**

## About WaveRD Server⚡

The manager's responsibilities in a professional football club usually include (but are not limited to) the following:[citation needed]

1. Selecting the team of players for matches, and their formation.
2. Planning the strategy, and instructing the players on the pitch.
3. Motivating players before and during a match.
4. Delegating duties to the first team coach and the coaching and medical staff.
5. Scouting for young but talented players for eventual training in the youth academy or the reserves, and encouraging their development and improvement.
6. Buying and selling players in the transfer market, including loans.
7. Facing the media in pre-match and post-match interviews.
   > Some of the above responsibilities may be shared with a director of football or sporting director, and are at times delegated to an assistant manager or club coach. <hr/> Additionally, depending on the club, some minor[citation needed] responsibilities include:
8. Marketing the club, most especially for ticket admission, sponsorship and merchandising.
9. Growing turnover and keeping the club profitable. <br/ > These responsibilities are more common among managers of small clubs.

WaveRD Client holds the code necessary for the web version of [WaveRD](https://www.waverd.com), which is an online Soccer Manager App with the main of building an engaging online soccer game with peoples satisfaction as our goal. What motivated me to build WaveRD was the inability for existing Online Manger games to give what we really want in a soccer manager app, after sending mails most platform on how to improve the game, without response, i can across one post where a user asked 'Do the developers of this game even play it, or are they just there for money'.

WaveRD Web is hosted on **[Vercel](https://vercel.com/)** and can be found here at [home](https://www.waverd.com), [Manager](https://manager.waverd.com/) and [apihub](https://hub.waverd.com/). Its subdomain, though similar in nature: console | accounts | manager | apihub makes it easier to access various section of WaveRD

| Domains  | Action                                                                      |
| -------- | --------------------------------------------------------------------------- |
| console  | Handles admin/moderators actions such as logs, contact us, etc.             |
| accounts | Handles actions such as signin, signup, password reset, data deletion, etc. |
| manager  | handles all soccer manager related endpoints                                |
| apihub   | handles all public apihub related endpoints                                 |

> To learn more about this project, kindly contact the developer [😎 ChukwuEmeka Maduekwe](https://www.linkedin.com/in/chukwu3meka/):

## 💰 Support Me 👋

<p align="center">
<a href="https://www.buymeacoffee.com/chukwu3meka" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="70" ></a>
</p>

## Getting Started

- _Fork_ **WaveRD Web** [here](https://github.com/Chukwu3meka/waverd-client)
- Now clone your remote branch, and run `pnpm install` or `pnpm i` for short; to install all packages
- If you don't have a gitignore file, create one and [run](https://sigalambigha.home.blog/2020/03/11/how-to-refresh-gitignore/) `git rm -r --cached .` to ensure git is tracking the right file, i.e files not listed in the new _.gitignore_
- In development we run a single command to reflect changes on file change, and to keep our app running all the time
  > `npm run dev`: to compile our typescript files and start our development server
  > It is worth noting that we use proxy to have our frontend/backend on the same port during development
- Verify Git remote URL by running `git remote -v`
- Client and Server share the same Validator to avoid conflict and aid debugging
- Happy hacking...😉

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

  e.g. `feat(components): add new prop to the avatar component`

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).
