window.onload = function() {
    const box1 = document.getElementById('box1');
    const box2 = document.getElementById('box2');
    const button1 = document.getElementById('button1');
    const button2 = document.getElementById('button2');

    box1.style.animation = 'slideUp 1s forwards';
    box2.style.animation = 'slideUp 1s forwards';
    
    setTimeout(() => {
        button1.style.animation = 'flyIn 0.5s forwards';
        button2.style.animation = 'flyIn 0.5s forwards';
        button1.style.opacity = '1';
        button2.style.opacity = '1';
    }, 1000);
};
