import { ApiProperty } from "@nestjs/swagger";

export class I18nName {
    @ApiProperty()
    en: string;
  
    @ApiProperty()
    ko: string;
  }
  