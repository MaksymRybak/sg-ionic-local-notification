import { Component, OnInit } from "@angular/core";
import { LocalNotification, LocalNotificationActionPerformed, Plugins } from "@capacitor/core";
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
              input: true, // like quick reply with a message NICE!!!
            },
          ],
        },
      ],
    });
  
    // notification listeners
    LocalNotifications.addListener('localNotificationReceived', (notification: LocalNotification) => {
      this.presentAlert(`Action Received: ${notification.title}`, `Custom Data: ${JSON.stringify(notification.extra)}`);
    });
    
    LocalNotifications.addListener('localNotificationActionPerformed', (notification: LocalNotificationActionPerformed) => {
      this.presentAlert(`Action Performed: ${notification.actionId}`, `Custom Data: ${JSON.stringify(notification.inputValue)}`);
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
          actionTypeId: "CHAT_MSG",
          attachments: [
            { id: "face", url: "res://public/assets/icon_x_notification.jpg" }, // NOTE: we can use face for id and specify the path in our app, it's an open issue on ionic to download the image using http
          ],
          // schedule: { at: new Date(Date.now() + 1000 * 3) },  // different options available for scheduling
        },
      ],
    });
  }

  async presentAlert(header, message) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
