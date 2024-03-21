<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "FooterSection",
  components: {},
  setup() {
    return {};
  },
});
</script>

<template>
  <footer>
    <div class="footer-content">
      <div class="footer-links">
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
        </ul>
      </div>
      <div class="social-links">
        <ul>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Twitter</a></li>
          <li><a href="#">Instagram</a></li>
          <!-- Link to Instagram -->
          <li><a href="#">LinkedIn</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 Your Company. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: #333;
  color: #fff;
  padding: 20px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
}

.footer-links ul,
.social-links ul {
  list-style-type: none;
  padding: 0;
}

.footer-links ul li,
.social-links ul li {
  margin-bottom: 10px;
}

.footer-links ul li a,
.social-links ul li a {
  color: #fff;
  text-decoration: none;
}

.footer-links ul li a:hover,
.social-links ul li a:hover {
  text-decoration: underline;
}

.footer-bottom {
  margin-top: 20px;
  text-align: center;
}
</style>
