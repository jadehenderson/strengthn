<script>
    import G6 from "@antv/g6";
    import G6Component from "../../../components/connections.svelte";
    const options = {
      container: "mountNode",
      width: 400,
      height: 400,
      workerEnabled: false
    };
    const data = {
      nodes: [
        {
          id: "node1",
          x: 100,
          y: 200
        },
        {
          id: "node2",
          x: 300,
          y: 200
        },
        {
          id: "node3",
          x: 150,
          y: 150
        }
      ],
      edges: [
        {
          source: "node1",
          target: "node2"
        },
        {
          source: "node1",
          target: "node3"
        },
        {
          source: "node3",
          target: "node2"
        }
      ]
    };
  </script>
  
  <style>
    main {
      font-family: sans-serif;
      text-align: center;
    }
  </style>
  
  <main>
      <h1>Your Connections</h1>
      <G6Component {G6} {options} {data} />
  
  </main>