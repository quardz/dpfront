import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excerpt',
  pure: false

})
export class Excerpt implements PipeTransform {

  transform(text: String, length:any ): any {
    text = text.replace(/<[^>]*>?/gm, '');
    if (!text || !length) {
      return text;
    }
    if (text.length > length) {
      return text.substr(0, length) + '...';
    }
      return text;
  }
}