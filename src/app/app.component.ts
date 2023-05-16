import { Component, OnInit } from "@angular/core";
import { SocketIoService } from "./core/services/socket-io.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
  }
}
