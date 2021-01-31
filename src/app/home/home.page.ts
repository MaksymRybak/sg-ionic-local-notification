import { Component, OnInit } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { AlertController } from "@ionic/angular";
const { LocalNotifications } = Plugins;

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  constructor(private alertCtrl: AlertController) {}

  async ngOnInit() {
    // first of all we should check if user allowed notifications
    await LocalNotifications.requestPermission();

    // general registration of action type
    LocalNotifications.registerActionTypes({
      types: [
        {
          id: "CHAT_MSG", // we have N settings for different kind of notifications
          actions: [
            {
              id: "view",
              title: "Open Chat",
            },
            {
              id: "remove",
              title: "Dismiss",
              destructive: true,
            },
            {
              id: "respond",
              title: "Respond",
              input: true,            // like quick reply with a message NICE!!!
            },
          ],
        },
      ],
    });
  }

  async scheduleBasic() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Friendly reminder",
          body: "Join Ionic Academy",
          id: 1,
          extra: {
            data: "pass data to you handler",
          },
          iconColor: "#0000FF",
        },
      ],
    });
  }

  async scheduleAdvanced() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Friendly reminder",
          body: "Join Ionic Academy",
          id: 2,
          extra: {
            data: "pass data to you handler",
          },
          iconColor: "#0000FF", 
          actionTypeId: 'CHAT_MSG',
          attachments: [
            { id: 'face', url: 'res://public/assets/icon_x_notification.jpg'}  // NOTE: we can use face for id and specify the path in our app, it's an open issue on ionic to download the image using http
          ]
        },
      ],
    });
  }
}
