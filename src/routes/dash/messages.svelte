<script>
	import { fade, slide, scale, fly } from 'svelte/transition';
	import { messages, loadMessages } from '../../stores/message';
	import { groupsStore, loadGroupsStore } from '../../stores/groups';
	import Messagenav from '../../components/messagesnav.svelte';
	import { userID } from '../../stores/userid';
	import { jwt } from '../../stores/jwt';
	import { onMount } from 'svelte';
	import { groupidS } from '../../stores/groupid';
	import { get, post } from '../../lib/api';

	$: meh = '';
	let message;
	let dummy;
	$: groupnameA = '...';
	let navOpen = false;
	let fixGroupName;
	let groupsF;

	onMount(async () => {
		await loadGroups();
	
	});

	export const loadGroups = async () => {
		try {
			// why doesn't this just use the groupsStore directly?
			const groupsfetch = await get('user/groups', $jwt);
			/*await fetch('https://stengthn.herokuapp.com/user/groups', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					token: JSON.stringify($jwt)
				}
			});*/

			const groupsfetched = await groupsfetch.json();
			groupsF = groupsfetched;
			
			if (groupsF != 0){
			for (let g in groupsF){
			
				if ($groupidS == groupsF[g].groupid){
					
					groupnameA = groupsF[g].groupname;
				}
			}
		}

		
		} catch (err) {
			console.log(err);
		}
	};

	


	function scrollFunc() {
		var element = document.getElementById('chatbox');
		element.scrollTop = element.scrollHeight;
	}

	function squish() {
		navOpen = !navOpen;
	}

	function replace(event) {
		groupidS.set(event.detail.groupidD.toString());
		groupnameA = event.detail.groupnameD.toString();
		realTime();
	}

	const realTime = async () => {
		await loadGroupsStore();
		await loadMessages();
		

		try {
			const res = await get(`user/messages/${$groupidS}`, $jwt);
			/*await fetch(`https://stengthn.herokuapp.com/user/messages/${$groupidS}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					token: JSON.stringify($jwt)
				}
			});*/

			const groupmessagesA = await res.json();
			meh = Object.values(groupmessagesA).reverse();
			

		} catch (err) {
			try {
				const res = get(`user/messages/${$messages[0].groupid.toString()}`, $jwt);
				/*await fetch(
					`https://stengthn.herokuapp.com/user/messages/${$messages[0].groupid.toString()}`,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							token: JSON.stringify($jwt)
						}
					}
				);*/

				const groupmessagesA = await res.json();
				meh = Object.values(groupmessagesA).reverse();

			} catch (err) {
				console.log(err);
			}
		}

		// element.scrollHeight - Math.abs(element.scrollTop) === element.clientHeight

		return;
	};

	function check() {
		
		if (message.trim().length === 0) {
			return;
		} else {
			
			submit();
		}
	}

	const submit = async () => {
	
		try {
			const submit = await post({
				path: `user/messages/${$groupidS}`, 
				data: {
					message
				},
				token: $jwt
			});
			/*await fetch(`https://stengthn.herokuapp.com/user/messages/${$groupidS}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					token: JSON.stringify($jwt)
				},
				body: JSON.stringify({
					message
				})
			});*/
			const predata = await submit;
			const data = await submit.json();


		} catch (err) {
			try {
				const submit = post({
					path: `user/messages/${$messages[0].groupid.toString()}`,
					data: {
						message
					},
					token: $jwt
				});
				/*await fetch(
					`https://stengthn.herokuapp.com/user/messages/${$messages[0].groupid.toString()}`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							token: JSON.stringify($jwt)
						},
						body: JSON.stringify({
							message
						})
					}
				);*/
				const predata = await submit;
				const data = await submit.json();

	
			} catch (err) {
				console.log(err);
			}

			message = '';
			// scrollFunc();
		}

		message = '';
		// scrollFunc();
	};

	setInterval(realTime, 100);


	$: reactiveGroupsStore = $groupsStore;
</script>

<body in:fly={{ x: -5, duration: 500, delay: 500 }} out:fly={{ x: 5, duration: 500 }}>
	<div class="test">
		<Messagenav on:hamburger={squish} on:groupchat={replace} />
		
		<!-- {console.log("s", $groupidS)}
		{console.log("n", groupnameA)} -->
		{#if $groupidS == undefined || $groupidS == 'not0' || $groupidS == null|| groupnameA == undefined || groupnameA == null || groupnameA == 'undefined' || groupnameA == "..."}

		<div class="noName" />
			
		{:else if reactiveGroupsStore != undefined || reactiveGroupsStore != null || reactiveGroupsStore != []}
		<!-- {#if groupnameA == "..."}
		<div class="noName" />
		{:else} -->
			{#each reactiveGroupsStore as { groupid }, i}
				{#if groupid == $groupidS}
					<h1 class="title">{reactiveGroupsStore[i].groupname}</h1>
				{/if}
			{/each}
		{/if}
		<!-- {/if} -->
		<!-- <h1 class="title">Group {$groupidS}</h1> -->
		<div class="chatbox" id="chatbox" class:adjust={navOpen}>
			{#if meh[0] == 'User does not have access to this group'}
				<p />
			{:else}
				{#each meh as { created_at, groupid, message, sentby, userid }}
					{#if message == null}
						<p />
					{:else if userid == $userID}
						<div class="flexRight">
							<div class="wrapMyMessage">
								<p class="myMessage">{message}</p>
							</div>
						</div>
					{:else}
						<div class="flexLeft">
							<div class="wrapTheirMessage container">
								<div>
									<p class="name">{sentby}</p>
									<p class="theirMessage">{message}</p>
								</div>
							</div>
						</div>
					{/if}
				{/each}

				<div bind:this={dummy} class="sickofyou">
					<!-- <p>tryagainandgain</p> -->
				</div>
			{/if}
		</div>

		<form on:submit|preventDefault={check} class:adjust={navOpen}>
			<input placeholder="....." bind:value={message} />
			<button on:click|preventDefault={check}>Send</button>
		</form>
	</div>
</body>

<style>
	* {
		box-sizing: border-box;
	}

	.noName {
		height: 70px;
	}

	.title {
		font-family: 'Raleway', sans-serif;
		font-weight: 700;
		width: 50vw;
		padding: 5px;
		margin: 9px;
		margin-left: 18.5%;
	}

	.chatbox {
		background-color: #dbe6fd;
		background-color: rgb(219, 230, 253, 0.4);
		border-radius: 10px;
		height: 80vh;
		width: 76.9vw;
		padding: 10px;
		margin-left: 18.5%;
		margin-bottom: 1%;
		transition: 0.5s;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
	}

	.flexRight {
		display: flex;
		justify-content: flex-end;
	}
	.wrapMyMessage {
		display: flex;
		justify-content: flex-end;
		margin: 0px 11px 10px 11px;
		width: 48%;
	}

	.myMessage {
		justify-content: flex-end;
		background-color: #47597e;
		color: #ffffff;
		font-size: 13px;
		border-radius: 10px;
		padding: 11px;
		/* margin: 11px; */
	}

	.flexLeft {
		display: flex;
		justify-content: flex-start;
	}

	.wrapTheirMessage {
		display: flex;

		justify-content: flex-start;
		margin: 0px 11px 10px 11px;
		width: 48%;
	}

	.theirMessage {
		background-color: #ffffff;
		color: #000000;
		font-size: 13px;
		border-radius: 10px;
		padding: 11px;
		margin-left: 3px;
		margin-top: 0px;
		display: flex;
	}

	.name {
		color: #909498;
		font-size: 13px;
		margin-bottom: 9px;
	}

	form {
		height: 6vh;
		width: 76vw;
		margin-left: 18.5%;
		display: flex;
		transition: 0.5s;
	}

	form input {
		flex: 1;
		margin-right: 15px;
		border-color: DCDCDC;
		border-width: thin;
		outline: none;
		background-color: #ffffff;
		font-size: 12px;
		border-radius: 10px;
		padding: 11px;
	}

	form button {
		background: rgba(71, 89, 126, 0.48);
		color: #ffffff;
		border: 2px solid rgba(220, 220, 220, 0.25);
		border-radius: 5px;
		padding: 2px 35px;
	}

	.adjust {
		width: 64.5vw;
	}
</style>
