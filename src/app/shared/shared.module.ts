import { NgModule } from "@angular/core";
import { ComponentsModule } from "@shared/components/components.module";
import { FileService } from "@shared/services/file.service";

@NgModule({
  imports: [ComponentsModule],
  providers: [FileService],
})
export class SharedModule {}
