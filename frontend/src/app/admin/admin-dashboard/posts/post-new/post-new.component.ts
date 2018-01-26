import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Band } from '../../bands/band.model';
import { Tag } from '../../tags/tag.model';
import { BandsService } from '../../bands/bands.service';
import { TagsService } from '../../tags/tags.service';
import { PostService } from '../../../../shared/services/post.service';
require('aws-sdk/dist/aws-sdk');

@Component({
  selector: 'rnm-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css']
})
export class PostNewComponent implements OnInit {
  postNewForm: FormGroup;
  // List of bands to display in band select tag.
  bands: Band[] = [];
  // List of tags to display in tag select tag.
  tags: Tag[] = [];
  fileName = '';
  imageFile: any;
  imageFileName: string;

  constructor(private bandsService: BandsService,
              private tagsService: TagsService,
              private postsService: PostService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.getBands();
    this.getTags();

    this.postNewForm = this.fb.group({
      'title': ['', [
        Validators.required,
        Validators.minLength(20)
      ]],
      'content': ['', [
        Validators.required,
        Validators.minLength(1000)
      ]],
      'image': [this.fileName, Validators.required],
      'bandId': ['', Validators.required],
      'tags': ['', Validators.required]
    });
  }

  /**
   * Get a list of bands for select field.
   */
  getBands() {
    this.bandsService.getBandsForNewPost()
      .subscribe(data => {
        this.bands = data['bands'];
    });
  }

  /**
   * Get a list of tags for select field.
   */
  getTags() {
    this.tagsService.getTagsForNewPost()
      .subscribe(data => {
        this.tags = data['tags'];
        console.log(this.tags);
    });
  }

  onPublish() {
    this.postsService.store(this.postNewForm.value)
      .subscribe((response) => {
        const responseStatus = response.status;

          if (responseStatus === 200) {
            this.onUploadImage();

            this.postNewForm.reset();
            this.postNewForm.patchValue({'bandId': ''});
          }
      });
  }

  /**
   * Upon choosing of image file create new unique name and prepare file object for uploading.
   *
   * @param $event
   */
  onFileChange($event) {
    if ($event.target.files.length > 0) {
      this.imageFile = $event.target.files[0];
      const imageExtension = this.imageFile.name.split('.').pop();
      const newFileName = Date.now();
      const newFullFileName = `${newFileName}.${imageExtension}`;
      this.imageFileName = newFullFileName;

      this.postNewForm.patchValue({'image': newFullFileName});
      console.log(newFullFileName);
    }
  }

  /**
   * Upload image to Amazon S3 bucket.
   */
  onUploadImage() {
    const AWSService = window.AWS;
    const file = this.imageFile;
    AWSService.config.accessKeyId = '';
    AWSService.config.secretAccessKey = '';
    AWSService.config.region = 'eu-west-2';
    const bucket = new AWSService.S3({params: {Bucket: 'rnm-blog.media/images/posts'}});
    const params = {Key: this.imageFileName, Body: file};

    bucket.upload(params, function (error, res) {
      console.log('error', error);
      console.log('response', res);
    });
  }
}
