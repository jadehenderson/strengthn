<script>
    import {
      Button,
      Modal,
      ModalBody,
      ModalFooter,
      ModalHeader
    } from 'sveltestrap';
    let openScrollable = false;
    const toggleScrollable = () => (openScrollable = !openScrollable);
  </script>
  
  <!-- Thanks to https://sveltestrap.js.org/?path=/story/components--modals for examples on rendering bootstrap modals in svelte -->
  <div>
    <Button outline color="dark" on:click={toggleScrollable}>Conversation Sparks</Button>

    <Modal isOpen={openScrollable} toggle={toggleScrollable} scrollable>
      <ModalHeader toggle={toggleScrollable}>Conversation Sparks</ModalHeader>
      <ModalBody>
        <p style="min-height: 1500px;">Getting the conversation started can be difficult, here are some topics to help you get going!<br><br>
            <li>Begin with a simple introduction about yourself</li><br>
            <li>Ask about hobbies</li><br>
            <li>Start recommendation lists of movies/shows/music etc.</li><br>
            <li>Share stories of interesting trips/experiences you've had</li><br>
            <li>Suggest doing something simple with your group such as a game night</li>
            <br>
            <img
              src="/motivation.jpg"
              alt="To make something special you just have to believe it's special"
              class="img-fluid"
            />
            Photo by <a href="https://unsplash.com/@merttly?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mert Talay</a> on <a href="https://unsplash.com/s/photos/motivation?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
        </p>
      </ModalBody>
      <ModalFooter>
        <Button outline color="dark" on:click={toggleScrollable}>Exit</Button>
      </ModalFooter>
    </Modal>
  </div>