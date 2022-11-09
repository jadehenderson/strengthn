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
        <p style="min-height: 1500px;">Add conversatation topics for users to talk about.</p>
      </ModalBody>
      <ModalFooter>
        <Button outline color="dark" on:click={toggleScrollable}>Exit</Button>
      </ModalFooter>
    </Modal>
  </div>