<template>
	<b-form @submit="onSubmit" class="container">
		<center><h1>Forget Password</h1></center>
		<b-form-group>
		  <b-form-input v-model="email" type="email" placeholder="Email" required/>
		</b-form-group>

		<div class="text-center">
		  <b-button type="submit" variant="primary" block>Kirim Kode Verifikasi</b-button>
		</div>
	</b-form>
</template>