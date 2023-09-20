<a name="readme-top"></a>

<div align="center" >
  <a href="https://github.com/gitesh152/Taskify">
    <img src="https://res.cloudinary.com/dm34wmjlm/image/upload/v1695189084/Taskify/ss/Taskify-logo_esoit0.png" alt="Logo" width="80" height="80">
    <h3 align="center">Taskify</h3>
  </a>

  <p align="center">
    A task managemnt tools.
    <br />
    <br />
    <a target="_blank" href="http://taskify-72sn.onrender.com/" >Live Preview</a>
    <br />
    (wait for app server to restart from sleep ...)
  </p>
</div>

<!-- TABLE OF CONTENTS -->

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <a href="#screenshots">Screenshots</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This is project management application which let user to assign task to other user.

It let describe task title, description, add attachement and assignee to the task.
Users will get realtime on  website and email notification as a task is assigned or if there is changes in task.

Users can also sort, filter, search tasks and change its status.
And only task manager(admin) update task infrmation and delete the task.

It is completely responsive application.
Its UI has ntification bell for notification and refresh button to refresh tasks.
Its UI also has Modal for create/update tasks and Check other users profile.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## screenshots

Login
![Screenshot](https://res.cloudinary.com/dm34wmjlm/image/upload/v1695188647/Taskify/ss/taskify-login_na5ddy.png)

Home
![Screenshot](https://res.cloudinary.com/dm34wmjlm/image/upload/v1695188654/Taskify/ss/taskify-home_k0e9vp.png)

Create Task
![Screenshot](https://res.cloudinary.com/dm34wmjlm/image/upload/v1695188654/Taskify/ss/taskify-home_k0e9vp.png)

Search Task
![Screenshot](https://res.cloudinary.com/dm34wmjlm/image/upload/v1695188654/Taskify/ss/taskify-home_k0e9vp.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

<ol>
<li>MongoDB(MongooseJS)</li>
<li>ExpressJS</li>
<li>ReactJS</li>
<li>NodeJS</li>
<li>Scoket.IO</li>
<li>ChakraUI</li>
</ol>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Get started with setting up project in a environment.

### Prerequisites

Install npm (node package manager)

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

Get clone of git repository.

1. Clone the repo
   ```sh
   git clone https://github.com/gitesh152/Taskify.git
   ```
2. Goto the project folder
   ```sh
   cd Taskify
   ```
3. Goto the backend folder
   ```sh
   cd backend
   ```
3. Create .env file and store environment variables
   ```js
   touch .env
   ```
4. Install NPM packages in backend folder
   ```sh
   npm install
   ```
5. Start backend server
   ```sh
   npm start
   ```
6. Create new terminal and goto frontend folder
   ```js
   cd frontend
   ```
7. Start frontend server
   ```sh
   npm start
   ```

Our App is running :)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

This project is a powerful demonstration of task management application,
which is setup over intenet with realtime notifications.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Backend with NodeJS and ExpresJS for backend endponits
- [x] Frontend with ReactJS and ChakraUI for frontend interface
- [x] Socket.IO for server end and Socket.io-Client for client end providing notitfications
- [x] Setup nodemailer for email notifications
- [ ] Profile Updation Page etc.

See the [open issues](https://github.com/gitesh152/Taskify/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Gitesh Kumar

[@LinkedIn](https://www.linkedin.com/in/gitesh-kumar-an5h/) - https://www.linkedin.com/in/gitesh-kumar-an5h/

[@Gmail](https://mail.google.com/mail/u/0/?fs=1&to=gitesh152@gmail.com&su=SUBJECT&body=BODY&tf=cm) - gitesh152@gmail.com/

Project Link: [https://github.com/gitesh152/Taskify](https://github.com/gitesh152/Taskify)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

These are some more useful libraries and resources used in project

<ol>
<li>JWTWebToken</li>
<li>BcryptJS</li>
<li>Nodemailer</li>
<li>Axios</li>
<li>React-Icons</li>
<li>React-Notification-Badge</li>
</ol>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
