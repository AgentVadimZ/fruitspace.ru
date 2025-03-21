variable "VERSION" {
  type = string
  default = "beta"
}

variable "DOCKERPASS" {
  type = string
}

job "FruitSpace-Beta-Deployment" {
  datacenters = ["vrn", "edge"]

  group "fruitspace-web" {
    count = 1
    network {
      port "node" { to = 3000 }
    }

    service {
      name = "beta-fruitspace-web"
      port = "node"
      tags = ["urlprefix-beta.fruitspace.ru/"]
      check {
        name     = "alive"
        type     = "http"
        path     = "/"
        interval = "30s"
        timeout  = "15s"
      }
    }


    update {
      max_parallel     = 1
      canary           = 1
      min_healthy_time = "30s"
      healthy_deadline = "5m"
      auto_revert      = true
      auto_promote     = true
    }

    task "next-node" {
      driver = "docker"
      config {
        image = "cr.yandex/crpr24jcqm2dno6qlm3b/fruce-www_beta"
        ports = ["node"]

        auth {
          username = "oauth"
          password = var.DOCKERPASS
        }
      }

      env {
        VERSION = var.VERSION
      }
      resources {
        cpu        = 100
        memory     = 64
        memory_max = 4096
      }

    }
  }
}
