import { Component, OnInit } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { AlertController } from "@ionic/angular";
const {LocalNotifications} = Plugins;

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
          iconColor: '#0000FF'
        },
      ],
    });
  }

  scheduleAdvanced() {}
}
