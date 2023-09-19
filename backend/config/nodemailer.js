import nodemailer from 'nodemailer';

let smtp = {
    service: 'gmail',                                   //service provider
    host: 'smtp.gmail.com',                             //hostname
    port: 465,                                          //Gmail's secure SMTP server typically uses port 465 for SSL/TLS encrypted connections.
    secure: true,                                       //connection established over SSL/TLS
    auth: {
        //authentication credentials for Gmail account
        user: process.env.SOCIOUT_GMAIL_USER,           
        pass: process.env.SOCIOUT_GMAIL_PASSWORD,
    },
}

const transport = nodemailer.createTransport(smtp);

const newTaskTemplate = (task) => {
    return `
<div>
  <p>Hi ${task.assignee.name} !</p>
  <p>A new task <b>${task.title}</b> has been assigned you. </p>
  <P>Thanks & Reagrds<br />
  ${task.admin.name}</P>
</div>
`;
};

const newTaskAssignEmail = (task) => {
    transport.sendMail({
        from: task.admin.email,                     //will not send using this email (will be sent using email defined in smtp object)
        to: task.assignee.email,                    //receiver email
        subject: 'New Task Assigned !',             
        html: newTaskTemplate(task),
    }, (error, info) => {
        if (error) return console.log(error);
        // console.log("Mail Sent ", info);
        console.log(`Mail Sent to ${info.accepted}`);
    })
}

const taskUpdateTemplate = (task) => {
    return `
<div>
<p>Hi ${task.assignee.name} !</p>
<p>Task <b>${task.title}</b> has been updated, please check! </p>
<P>Thanks & Reagrds<br />
${task.admin.name}</P>
</div >
    `;
};

const adminTaskUpdateEmail = (task) => {
    transport.sendMail({
        from: task.admin.email, //will not send using this email
        to: task.assignee.email,
        subject: 'Task Update !',
        html: taskUpdateTemplate(task),
    }, (error, info) => {
        if (error) return console.log(error);
        // console.log("Mail Sent ", info);
        console.log(`Mail Sent to ${info.accepted} `);
    })
}

const taskStatusUpdateTemplate = (title, sender, receiver, status) => {
    return `
<div>
<p>Hi ${receiver} !</p>
<p>Task <b>${title}</b> status has been updated to <b> ${status === 'Assigned' ? 'Re-Assigned and Incomplete' : status}! </b> </p>
<P>Thanks & Reagrds<br />
${sender}</P>
</div >
    `;
};

const taskStatusUpdateEmail = (title, sender, receiver, status) => {
    transport.sendMail({
        from: sender.email, //will not send using this email
        to: receiver.email,
        subject: 'Task Update !',
        html: taskStatusUpdateTemplate(title, sender.name, receiver.name, status),
    }, (error, info) => {
        if (error) return console.log(error);
        // console.log("Mail Sent ", info);
        console.log(`Mail Sent to ${info.accepted} `);
    })
}

export { newTaskAssignEmail, adminTaskUpdateEmail, taskStatusUpdateEmail }
