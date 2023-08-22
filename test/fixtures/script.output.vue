<script>
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script><script setup="">
import FooBar from './Foo.vue'
</script><template>
<h1>Hello</h1>
<h2>World</h2>

<p>Some content in between</p>

<foobar></foobar>
</template>