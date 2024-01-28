import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { SoundboardButton } from "@core/models/buttons.model";
import { Tool } from "@core/models/tool.model";
import { ModalService } from "@core/services/modal.service";
import { take } from "rxjs/operators";
import { CreateButtonModalComponent } from "../../soundboard/create-button-modal/create-button-modal.component";

@Component({
  selector: "sndb-toolbar",
  templateUrl: "./sndb-toolbar.component.html",
  styleUrls: ["./sndb-toolbar.component.scss"],
})
export class SndbToolbarComponent implements OnInit {
  @Output() createdButtonEvent: EventEmitter<SoundboardButton> =
    new EventEmitter<SoundboardButton>();

  public tools: { [toolKey: string]: Tool } = {};

  constructor(public modalService: ModalService) {}

  public ngOnInit(): void {
    this.tools = {
      createButton: {
        label: `Create new button`,
        customClass: "font-weight-bold",
        onClick: () => {
          this.modalService.openModal(CreateButtonModalComponent, {
            class: "modal-lg",
            animated: true,
          });

          const modalContent: CreateButtonModalComponent = this.modalService
            .bsModalRef.content as CreateButtonModalComponent;

          modalContent.buttonCreatedEvent
            .pipe(take(1))
            .subscribe((createdButton: SoundboardButton) => {
              this.createdButtonEvent.emit(createdButton);
            });
        },
      },
    };
  }

  public getToolByToolKey(toolKeyToFind: string): Tool | undefined {
    const foundToolPair: [string, Tool] | undefined = Object.entries(
      this.tools,
    ).find((value: [string, Tool]) => {
      const [toolKey, _]: [string, Tool] = value;
      if (toolKeyToFind === toolKey) return true;
    });

    if (foundToolPair) return foundToolPair[1];
  }
}
