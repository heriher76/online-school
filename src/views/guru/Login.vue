<template>
	<b-form @submit="onSubmit" class="container">
		<center><h1>Login</h1></center>
		<b-form-group>
		  <b-form-input v-model="username" type="text" placeholder="Username" required/>
		</b-form-group>

		<b-form-group :invalid-feedback="invalidFeedback">
		  <b-form-input v-model="password" type="password" placeholder="Password" required/>
		</b-form-group>

		<div class="text-center">
		  <b-button type="submit" variant="primary" block>Masuk</b-button>
		  <b-button variant="link" flat to="/guru/forget">Lupa Password?</b-button>
		</div>
	</b-form>
</template>