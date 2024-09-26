//new로 객체 생성  
const image1 = new Image(name);

//팩토리 패턴으로 객체 생성
function createImage(name) {
    return new Image(name);
}
const image2 = createImage('photo.jpeg');


//팩토리 패턴의 장정 : 생성 코드를 한곳에서 관리, 생성 로직이 달라지더라도 다른 곳을 수정할 필요 없다
function createImage(name) {
    if(name.match(/\.jpe?g$/)) {
        return new ImageJpeg(name);
    } else if (name.match(/\.gif$/)) {
        return new ImageGif(name);
    } else if (name.match(/\.png$/)) {
        return new ImagePng(name); 
    } else {
        throw new Error('Unsupported format');
    }
}
