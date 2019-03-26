class dLoading extends HTMLElement {
    constructor(){
        super()
        let shadow = this.attachShadow({ mode : 'open' })
        let html = document.createElement('div')
        let style = document.createElement('style')
        let text = document.createElement('p')
        this.textbar = text

        style.textContent = `
        
        div {
            border-radius: 50%;
            border-top: 10px solid grey;
            width: 100%;
            height: 100%;
            -webkit-animation: spin 2s linear infinite;
            animation: spin 2s linear infinite;
          }
          
          @-webkit-keyframes spin {
            0% { -webkit-transform: rotate(0deg); }
            100% { -webkit-transform: rotate(360deg); }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          p {
              font-size : 300%;
              margin-left : auto;
              margin-right : auto;
              text-align : center;
          }
        `
        shadow.appendChild(style)
        shadow.appendChild(html)
        shadow.appendChild(text)
    }

    set text(value){
        this.textbar.innerText = value
    }

    get text(){
        return this.textbar.innerText
    }
}

customElements.define('d-loading',dLoading)