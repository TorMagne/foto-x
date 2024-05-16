<template>
  <main class="container mx-auto mt-16 px-4">
    <section>
      <div class="hero hidden rounded-md bg-[#f5f5f5] p-6 shadow-md md:block">
        <div class="hero-content max-w-max flex-col justify-between lg:flex-row-reverse">
          <img src="../assets/images/header.jpg" class="max-w-sm rounded-md shadow-2xl" />
          <div class="md:mr-10">
            <h1 class="font-Raleway mb-4 text-5xl font-bold">Foto X</h1>
            <h2 class="font-Raleway text-3xl font-bold">Skjelstadås Fanger øyeblikket!</h2>
            <p class="font-Libre py-6 text-justify">
              Velkommen til Foto X, hvor hvert bilde forteller en unik historie fanget med lidenskap
              og dyktighet. Som spesialist innen maling med lys, skaper jeg kunstverk selv i
              utfordrende situasjoner, inspirert av min lidenskap og min utdanning ved Norsk
              Fotofagskole. La meg fange essensen av dine øyeblikk og skape bilder som inspirerer og
              berører. Kontakt Foto X i dag, og la oss sammen skape magi gjennom fotografiet.
            </p>
            <button
              class="font-Raleway btn rounded-md bg-black text-white duration-300 ease-in-out hover:border-2 hover:border-black hover:bg-transparent hover:text-black"
            >
              Produkter
            </button>
          </div>
        </div>
      </div>

      <div class="hero h-[800px] bg-transparent bg-[url('../assets/images/header.jpg')] md:hidden">
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-md">
            <h1 class="font-Raleway mb-5 text-5xl font-bold">Foto X</h1>
            <h2 class="font-Raleway mb-4 text-3xl font-bold">Skjelstadås Fanger øyeblikket!</h2>
            <p class="font-Libre mb-5 text-center">
              Velkommen til Foto X, hvor hvert bilde forteller en unik historie fanget med lidenskap
              og dyktighet.
            </p>
            <button
              class="font-Raleway btn rounded-md border-white bg-transparent text-white duration-300 ease-in-out hover:border-black hover:bg-white hover:text-black"
            >
              Produkter
            </button>
          </div>
        </div>
      </div>
    </section>

    <section
      class="mt-10 grid grid-cols-1 place-content-between gap-8 text-white md:mt-32 md:grid-cols-2"
    >
      <div class="mb-6 md:mb-0">
        <h2 class="font-Raleway mb-6 text-lg font-bold md:text-3xl">Hva gjør Foto X, Unik?</h2>
        <p class="font-Libre mb-4">
          Som fotograf har jeg spesialisert meg i teknikken maling med lys. Jeg foretrekker å jobbe
          med naturlig lys eller maling med lys i stedet for å bruke blitz, noe som gjør at bildene
          mine skiller seg ut med sin naturlige skjønnhet og stemning.
        </p>
        <p class="font-Libre mb-4">
          Min utdannelse har rustet meg med den nødvendige kunnskapen og ferdighetene til å skape
          kunstverk av høy kvalitet som du virkelig fortjener.
        </p>
        <button
          class="font-Raleway btn rounded-md border-white bg-transparent text-white duration-300 ease-in-out hover:border-black hover:bg-white hover:text-black"
        >
          Om foto X
        </button>
      </div>

      <div class="avatar">
        <div class="ml-auto w-full rounded md:w-[450px]">
          <img src="../assets/images/omfotoxhomepage.jpg" alt="partner image" />
        </div>
      </div>
    </section>

    <section
      class="mt-10 grid grid-cols-1 place-content-between gap-8 text-white md:mt-32 md:grid-cols-2"
    >
      <div class="avatar order-2 md:order-1">
        <div class="w-full rounded md:w-[450px]">
          <img src="../assets/images/omfotox.jpg" alt="partner image" />
        </div>
      </div>

      <div class="order-1 mb-6 md:order-2 md:mb-0">
        <h2 class="font-Raleway mb-6 text-lg font-bold md:text-3xl">Ina Skjelstadås</h2>
        <p class="font-Libre mb-4">
          Jeg har høyere fagskole grad i kunstfotografi ved Norsk Fotofagskole, og startet å ta
          bilder allerede som barn. vokste opp med en far som, var veldig gla i analogt fotografi og
          lærte tidlig om foto gjennom hans interesse.
        </p>
        <p class="font-Libre mb-4">
          når jeg var 13 år innså jeg at dette var det jeg ville bli når jeg ble stor. i dag jobber
          jeg som fotograf i eget firma. og ser fram til og ta bilde av deg og dine.
        </p>
        <button
          class="font-Raleway btn rounded-md border-white bg-transparent text-white duration-300 ease-in-out hover:border-black hover:bg-white hover:text-black"
        >
          Kontakt
        </button>
      </div>
    </section>
  </main>
</template>

<script setup></script>
