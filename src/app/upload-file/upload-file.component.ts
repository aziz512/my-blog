import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { slugify } from '../utils';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Component({
  selector: 'blog-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  currentFiles: { ref: any, fileName: string, percentage: Observable<number>, url: Observable<string> }[] = [];

  constructor(private storage: AngularFireStorage) { }

  ngOnInit() {
  }

  onNewFileChosen({ target: { files }, target }) {
    files = Array.from(files);
    files.forEach((file: any) => {
      const fileName = slugify(file.name);
      const filePath = `uploads/${fileName}`;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);

      // observe percentage changes
      const percentage = task.percentageChanges().pipe(map(percentage => Math.round(percentage)));

      this.currentFiles.push({ fileName, percentage, ref, url: null });
      // get notified when the download URL is available
      task.snapshotChanges().pipe(
        finalize(() => {
          this.currentFiles.find(x => x.ref === ref).url = ref.getDownloadURL();
        })
      ).subscribe();
    });
    target.value = '';
  }

}
