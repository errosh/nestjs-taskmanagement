import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../tasks.status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isValidStatus(value)) {
      throw new BadRequestException(`Task status : ${value} is not valid!`);
    }
    return value;
  }

  private isValidStatus(status: any): boolean {
    const idx = this.allowedStatus.indexOf(status);
    return idx !== -1;
  }
}
