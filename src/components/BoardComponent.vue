<template>
  <section>
    <StartGameModal
      @start-game="startGame"
      @difficulty="($event) => (totalCards = $event)"
      :show-modal="openMenu"
    />
    <WinnerModal v-if="showWinnerMessage" @play-again="playAgain" />
    <div class="memory-board-matched-pairs-timer">
      <div>
        <p>Matched Pair: {{ matchedPairs }}</p>
        <p>Movements: {{ movements }}</p>
        <p>Remaining Cards: {{ remainingCards }}</p>
      </div>

      <div>
        <TimerComponent
          @time-in-play="($event) => (timeInPlay = $event)"
          :stopTimer="stopTimer"
        />
      </div>
    </div>

    <div
      :class="`memory-board-container ${
        totalCards === 16
          ? 'memory-board-container-easy'
          : totalCards === 36
          ? 'memory-board-container-medium'
          : 'memory-board-container-heavy'
      }`"
    >
      <CardComponent
        v-for="(card, index) in shuffledEmojiList"
        :position="index"
        :key="index"
        :value="card.emoji"
        :visible="card.visible"
        @select-card="selectCard"
      />
    </div>

    <div>
      <FooterComponent
        @open-menu="handlerOpenMenu"
        @reset-game="($event) => startGame($event, true)"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from "vue";
import anime from "animejs/lib/anime.es.js";
import JSConfetti from "js-confetti";
// Store
import { useCounterStore } from "@/store/store";
// Assets
import celebrationSound from "@/assets/sounds/party-horn.mp3";
// Components
import CardComponent from "@/components/CardComponent.vue";
import TimerComponent from "@/components/TimerComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import StartGameModal from "@/components/StartGameModal.vue";
import WinnerModal from "@/components/WinnerModal.vue";

const imagesList = [];
const jsConfetti = new JSConfetti();
const store = useCounterStore();

const totalCards = ref(0);
const remainingCards = ref(totalCards.value);
const shuffledEmojiList = ref([]);
const userSelection = ref([]);
const userCanFlipCard = ref(true);
const matchedPairs = ref(0);
const movements = ref(0);
const timeInPlay = ref(0);
const stopTimer = ref(false);
const openMenu = ref(true);
const showWinnerMessage = ref(false);

/**
 * @description Before everything we need to generate the links for the images,
 * there is a lot of image to have a better game experience
 */
for (let i = 1; i <= 120; i++) {
  const imageUrl = `abstract-${i.toString().padStart(3, "0")}.svg`;
  imagesList.push(imageUrl);
}

const cardsGridAnimation = () => {
  anime({
    targets: ".memory-board-container .memory-card",
    scale: [
      { value: 0.1, easing: "easeOutSine", duration: 500 },
      { value: 1, easing: "easeInOutQuad", duration: 1200 },
    ],
    rotateY: "+=360",
    opacity: [0, 1],
    translateY: [-50, 0],
    delay: anime.stagger(100, {
      grid: [4, Math.ceil(totalCards.value / 4)],
      from: "center",
    }),
  });
};

const handlerOpenMenu = () => {
  openMenu.value = true;
};

/**
 * @description Method to suffle arrays
 * @return suffled array
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * @description This method will use shuffleArray to create "random"
 * positions for cards, then activate the animation
 * @return suffled array
 */
const shuffleAndPairCards = () => {
  stopTimer.value = false;
  const suffleList = shuffleArray([...imagesList]);
  const pairedEmojiList = [];
  for (let i = 0; i < totalCards.value / 2; i++) {
    pairedEmojiList.push(
      { emoji: suffleList[i], visible: true },
      { emoji: suffleList[i], visible: true }
    );
  }
  shuffledEmojiList.value = shuffleArray(pairedEmojiList);
  cardsGridAnimation();
  remainingCards.value = totalCards.value;
  return remainingCards.value;
};

/**
 * @description This function will control the click over cards
 * @param { Object } payload - position and value
 */
const selectCard = (payload) => {
  const cardIndex = payload.position;
  const cardSelected = shuffledEmojiList.value[cardIndex];

  if (userSelection.value.length) {
    if (userSelection.value[0].position === payload.position) {
      return;
    }

    if (userSelection.value.length === 2) {
      if (
        userSelection.value[0].faceValue === userSelection.value[1].faceValue
      ) {
        return;
      }
    }
  }

  if (userCanFlipCard.value) {
    cardSelected.visible = !shuffledEmojiList.value[cardIndex].visible;
  }

  userSelection.value.push(payload);
};

const restore = async () => {
  matchedPairs.value = 0;
  movements.value = 0;

  await shuffleAndPairCards();
  return cardsGridAnimation();
};

const startGame = async (userName, isSuffle) => {
  if (userName) {
    store.add_user(userName);
  }

  await restore();

  if (!isSuffle) {
    openMenu.value = !openMenu.value;
  }
};

const playAgain = async () => {
  restore();
  showWinnerMessage.value = false;
};

watch(totalCards, (newValue) => {
  remainingCards.value = newValue;
});

watch(() => {
  const userSelectionLength = userSelection.value.length;

  if (userSelectionLength === 2) {
    userCanFlipCard.value = false;
    const [cardOne, cardTwo] = userSelection.value;
    if (cardOne.faceValue === cardTwo.faceValue) {
      // How many pairs left / Winning Points
      matchedPairs.value++;
      movements.value++;
      remainingCards.value -= 2;

      // Audio
      var audio = new Audio(celebrationSound);
      audio.playbackRate = 0.9;
      audio.play();

      // Reset the selection and restore the flip action
      userSelection.value.length = 0;
      userCanFlipCard.value = true;

      if (remainingCards.value === 0) {
        stopTimer.value = true;
        store.add_to_records_board(timeInPlay.value, movements.value);
        jsConfetti.addConfetti();
        showWinnerMessage.value = true;
      }
    } else {
      setTimeout(() => {
        // When two selected cards are no visible we should hide them
        shuffledEmojiList.value[cardOne.position].visible =
          !shuffledEmojiList.value[cardOne.position].visible;
        shuffledEmojiList.value[cardTwo.position].visible =
          !shuffledEmojiList.value[cardTwo.position].visible;

        userSelection.value.length = 0;
        userCanFlipCard.value = true;
        movements.value++;
      }, 900);
    }

    userSelection.value.length = 0;
  }
});
</script>

<style scoped lang="scss">
@import "../assets/styles/colors.scss";

.memory {
  &-board {
    &-container {
      display: flex;
      flex-wrap: wrap;
      margin: 30px 0px 30px 0px;

      &-easy {
        width: 300px;
      }

      &-medium {
        width: 450px;
      }

      &-heavy {
        width: 600px;
      }
    }

    &-matched-pairs-timer {
      display: flex;
      justify-content: space-between;
      align-items: end;
      color: $black;
      font-size: 0.9em;
      padding: 0px 8px 0px 8px;

      p {
        margin: 0px;
      }
    }
  }
}
</style>
