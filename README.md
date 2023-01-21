# Slideshow

Simple slideshow

![slideshow](https://user-images.githubusercontent.com/89478867/213879550-a7bddd17-b6ab-4124-b4d4-800e6fdcc657.JPG)

Slideshow simples para desenvolvedores com projetos pequenos e que não querem perder tempo criando seu slideshow do zero.

Inclua o link para o CSS no head do sites, e depois inclua o link do Javascript antes da &lt;/body&gt;.
Após incluir os links acima, crie uma tag no HTML onde será incluído seu slide.

# Implementação:
<pre>
<code>

&lt;html&gt;

&lt;head&gt;...&lt;/head&gt;

&lt;body&gt;

&lt;div id="slideshow"&gt;&lt;/div&gt;

...

&lt;script&gt;
  var slideshow = new Slideshow({
   id : "slideshow",
   images : [
    {
     img: 'endereço-da-sua-imagem',
     desc: 'descrição da sua imagem',
    },
    {
     img: 'endereço-da-sua-imagem',
     desc: 'descrição da sua imagem',
    },
   ],
 })
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;
</code>
</pre>
