
// Call Github 
$.ajax({
    url: 'https://api.github.com/repos/DeadHeadStudio/FreeStuff/contents/',
    dataType: 'json',
    type: 'GET',
    success: function(data) {  
      if (data.length > 0) {
          data = data.reverse();
          
        $.each(data, function(i, val) { 
            
            var slice = val.name.split('.');
            var ext = slice.pop();
            
            var holder = document.getElementById('FreeStuffInner');
            
            var stuffSlide = document.createElement('div');
            stuffSlide.classList.add('carousel-item');
            
            if(i==0){
                stuffSlide.classList.add('active');
            }
            holder.appendChild(stuffSlide);
            
            
            if(ext == "jpeg" || ext == "png"){
                var stuffImage = document.createElement('img');
                stuffImage.classList.add('img-fluid');
                stuffSlide.appendChild(stuffImage);
                stuffImage.src = val.download_url;
            }
            
            else if(ext == 'mp4' || ext == 'avi'){
                var stuffVideo = document.createElement('video');
                stuffVideo.classList.add('w-100');
                stuffVideo.setAttribute("autoplay", "");
                stuffVideo.setAttribute("muted", "")
                stuffVideo.setAttribute("loop","");
                stuffSlide.appendChild(stuffVideo);
                stuffVideo.src = val.download_url;
            }
            
            
            var stuffCard = document.createElement('div');
            stuffCard.classList.add('card');
            stuffSlide.appendChild(stuffCard);

            var stuffTitle = document.createElement('h2');
            stuffTitle.classList.add('card-header', 'bg-primary', 'text-center', 'text-white');
            
            stuffTitle.innerHTML = slice[0];
            
            stuffCard.appendChild(stuffTitle);
            
            var cardBody = document.createElement('div');
            cardBody.classList.add('card-body', 'container-fluid', 'p-0');
            stuffCard.appendChild(cardBody);
            
            
            
            var row = document.createElement('div');
            row.classList.add('row', 'justify-content-center');
            cardBody.appendChild(row);
            
            var gitLabel = document.createElement('div');
            gitLabel.classList.add('col-12', 'col-sm-6', 'col-md-3', 'col-lg-2', 'text-center','align-self-center');
            gitLabel.innerHTML = 'GITHUB LINK:';
            row.appendChild(gitLabel);

            var gitHolder = document.createElement('div');
            gitHolder.classList.add('col-12', 'col-sm-6', 'col-md-3', 'col-lg-2', 'bg-gold');
            row.appendChild(gitHolder);
            
            var gitLinkHolder = document.createElement('a');
            gitLinkHolder.href = val.html_url;
            gitHolder.appendChild(gitLinkHolder);
            
            var gitLinkBtn = document.createElement('div');
            gitLinkBtn.classList.add('text-white', 'text-center', 'align-self-center');
            gitLinkBtn.innerHTML = 'VISIT SITE';
            gitLinkHolder.appendChild(gitLinkBtn);
             
            
            var fTypeLabel = document.createElement('div');
            fTypeLabel.classList.add('col-12', 'col-sm-6', 'col-md-3', 'col-lg-2', 'text-center', 'align-self-center');
            fTypeLabel.innerHTML = 'FILE TYPE:';
            row.appendChild(fTypeLabel);
            
            var fType = document.createElement('div');
            fType.classList.add('bg-pink', 'col-12', 'col-sm-6', 'col-md-3', 'col-lg-2', 'text-center', 'text-white', 'align-self-center');
            fType.innerHTML = ext;
            row.appendChild(fType);
            
            var fSizeLabel = document.createElement('div');
            fSizeLabel.classList.add('col-12', 'col-sm-6', 'col-md-3', 'col-lg-2', 'text-center', 'align-self-center');
            fSizeLabel.innerHTML = 'FILE SIZE:';
            row.appendChild(fSizeLabel);
            
            var fSize = document.createElement('div');
            fSize.classList.add('bg-blue', 'col-12', 'col-sm-6', 'col-md-3', 'col-lg-2', 'text-white', 'text-center', 'align-self-center');
            var fileSize = val.size +  'B';
            if(val.size>999999999){
                fileSize = Math.ceil(val.size/1000000000) + 'GB';
            }
            else if(val.size>999999){
                fileSize = Math.ceil(val.size/1000000) + 'MB';
            }
            else if(val.size>999){
                
                fileSize = Math.ceil(val.size/1000) + 'KB';
                
            }
            fSize.innerHTML = fileSize;
            row.appendChild(fSize);

            var row2 = document.createElement('div');
            row2.classList.add('row', 'justify-content-center', 'bg-success', 'rounded-bottom');
            cardBody.appendChild(row2);
            
            var downloadBtnHolder = document.createElement('a');
            downloadBtnHolder.href = val.download_url;
            row2.appendChild(downloadBtnHolder);
            
            var downloadBtn = document.createElement('h2');
            downloadBtn.classList.add('text-white', 'text-center');
            downloadBtn.innerHTML = 'DOWNLOAD';
            downloadBtnHolder.appendChild(downloadBtn);
            
            
            
            $('#shots').prepend(
            '<a class="shot" target="_blank" href="'+ val.html_url +'"title="' + val.title + '"><div class="title">' + val.title + '</div></a>'
            )
        
        });
          
      }
      else {
        $('#shots').append('<p>No shots yet!</p>');
      }
    }
});